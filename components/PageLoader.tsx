import Loading from "@/components/Loading";

export default function PageLoader() {
  return (
    <div
      style={{
        height: "calc(100vh - 6rem)",
      }}
      className="flex w-full items-center justify-center"
    >
      <Loading />
    </div>
  );
}
