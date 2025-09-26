import Container from "@/components/Container";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <Container size="lg">{children}</Container>;
}
