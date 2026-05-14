use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]

pub enum EventType {
    Click,
    ScrollStart,
    ScrollEnd,
    ScrollDepth,
    MouseMove,
    Input,
    Navigation,
    PageView,
}
