import { Footer, Header, Layout, Main } from "../Elements";
import FooterContent from "./FooterContent";
import HeaderContent from "./HeaderContent";
import MainContent from "./MainContent";

export default function AppLayout() {
  return (
    <Layout>
      <Header>
        <HeaderContent />
      </Header>
      <Main>
        <MainContent />
      </Main>
      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
}
