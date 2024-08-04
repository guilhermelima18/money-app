import { ReactNode } from "react";
import { TransactionProvider } from "./transaction";
import { CategoryProvider } from "./category";

type ContextsProps = {
  children: ReactNode;
};

export function Contexts({ children }: ContextsProps) {
  return (
    <TransactionProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </TransactionProvider>
  );
}
