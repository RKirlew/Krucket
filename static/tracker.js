(function () {
  const script = document.currentScript;
  const eventQueue = [];
  const siteId = script.getAttribute("data-site-id");
  let maxDepth = 0;
  let reachedMilestones = new Set();
  const endpoint =
    script.getAttribute("data-endpoint") || "http://localhost:3000";
  function sendEvent(eventType, data = {}) {
    eventQueue.push({
      site_id: siteId,
      event_type: eventType,
      url: window.location.href,
      timestamp: Date.now(),
      data: data,
    });
    fetch(`${endpoint}/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        site_id: siteId,
        event_type: eventType,
        url: window.location.href,
        timestamp: Date.now(),
        data: data,
      }),
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
    sendEvent("MouseMove", {
      x: e.pageX,
      y: e.pageY,
    });
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
