use crate::event_type::{self, EventType};
use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    pub site_id: String,
    pub event_type: EventType,
    pub url: String,

    pub timestamp: i64,
    pub country: Option<String>,
    pub data: serde_json::Value,
}
