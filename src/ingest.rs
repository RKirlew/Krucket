use axum::{Json, http::StatusCode};

use crate::{event_type::EventType, events::Event};

pub async fn handle_ingest(Json(event): Json<Event>) -> StatusCode {
    println!("{:?}", event);
    match event.event_type {
        EventType::Click => {
            let x = event.data["x"].as_f64().unwrap();
            let y = event.data["y"].as_f64().unwrap();
            println!("Click at x={},y={}", x, y);
        }

        EventType::PageView => {
            println!("Page view on {}", event.url);
        }
        _ => {}
    }
    StatusCode::OK
}
