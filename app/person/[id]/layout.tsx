import { ReactElement } from 'react';

const PersonLayout = ({ children }: { children: ReactElement }) => {
  return <main className="w-full p-40">{children}</main>;
};

export default PersonLayout;
