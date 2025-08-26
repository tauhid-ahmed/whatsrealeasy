export default function AdminCalendarPage() {
  return (
    <div className="flex justify-center items-center p-6 bg-white min-h-screen">
      {/* <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2iW40L8jWIzQoVRnTxuJv_sLNW49dk6EuxQWCXAKc8EnuzW4D9oABKT4IRW-f6yG0xbwXGFwz3?gv=true"
        style={{
          border: "0",
          backgroundColor: "transparent",
        }}
        width="100%"
        height="800"
        loading="lazy"
        className="rounded-2xl"
      /> */}
      <iframe
        src="https://calendar.google.com/calendar/embed?src=tauhidahmed.dev%40gmail.com&ctz=Asia%2FDhaka"
        style={{
          border: "0",
          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
        // frameborder="0"
        scrolling="no"
        className="h-screen bg-dark3"
      ></iframe>
    </div>
  );
}
