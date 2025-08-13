type TLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: TLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
