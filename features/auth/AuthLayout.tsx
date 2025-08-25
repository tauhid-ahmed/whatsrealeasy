import { Container } from "@/components";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <Container size="lg">{children}</Container>;
}
