import Shell from "./shell";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Shell>
      <main>{children}</main>
    </Shell>
  );
}
