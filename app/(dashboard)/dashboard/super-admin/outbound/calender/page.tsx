export default function AdminCalendarPage() {
  return (
    <div className="flex justify-center items-center p-6 bg-white">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=tauhidahmed.dev%40gmail.com&ctz=Asia%2FDhaka"
        style={{
          border: "0",
          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
        className="h-[calc(100vh-155px)] bg-dark3"
      ></iframe>
    </div>
  );
}
