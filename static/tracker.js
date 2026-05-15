(function () {
  const script = document.currentScript;
  let eventQueue = [];
  const siteId = script.getAttribute("data-site-id");
  const maxBatchSize = 50;
  const FLUSH_INTERVAL = 5000;

  let maxDepth = 0;
  let lastMouseMoveEventTime = 0;
  const throttleMS = 100;
  let reachedMilestones = new Set();
  const endpoint =
    script.getAttribute("data-endpoint") || "http://localhost:3000";

  async function flush() {
    if (eventQueue.length === 0) return;

    const batch = [...eventQueue];
    eventQueue = [];

    try {
      await fetch(`${endpoint}/ingest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
    } catch (err) {
      console.error("Failed to send events", err);

      eventQueue.unshift(...batch);
    }
  }

  function sendEvent(eventType, data = {}) {
    eventQueue.push({
      site_id: siteId,
      event_type: eventType,
      url: window.location.href,
      timestamp: Date.now(),
      data: data,
    });
    if (eventQueue.length > maxBatchSize) {
      flush();
    }
    setInterval(flush, FLUSH_INTERVAL);
    window.addEventListener("beforeunload", () => {
      if (eventQueue.length > 0) {
        navigator.sendBeacon(`${endpoint}/ingest`, JSON.stringify(eventQueue));
      }
    });
  }

  sendEvent("PageView");

  document.addEventListener("click", (e) => {
    sendEvent("Click", {
      x: e.clientX,
      y: e.clientY,
    });
  });
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMouseMoveEventTime > throttleMS) {
      sendEvent("MouseMove", {
        x: e.pageX,
        y: e.pageY,
        timestamp: now,
      });
      lastEventTime = now;
    }
  });
  document.addEventListener("scroll", (e) => {
    sendEvent("ScrollStart", {
      startPos: window.scrollY,
    });
  });

  document.addEventListener("scrollend", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    // Calculate percentage (0 to 100)
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    // Define our target milestones
    const milestones = [25, 50, 75, 100];

    milestones.forEach((checkpoint) => {
      // If the user has scrolled past a checkpoint AND we haven't tracked it yet
      if (scrollPercent >= checkpoint && !reachedMilestones.has(checkpoint)) {
        reachedMilestones.add(checkpoint);

        sendEvent("ScrollDepth", {
          milestone: checkpoint,
          percentage: scrollPercent,
          pixelDepth: scrollTop,
        });

        console.log(`Milestone reached: ${checkpoint}%`);
      }
    });
  });
})();
