import Link from "@/common/Link";
import LinkButton from "@/common/LinkButton";
import { useLogoutUser } from "@/hooks/useLocations";
import { useToggle } from "@/hooks/useToggle";
import tw from "twin.macro";
import ConfirmModal from "./ConfirmModal";

const Nav = tw.nav`w-full navbar bg-base-300`;
const MenuIcon = tw.svg`inline-block w-6 h-6 stroke-current`;
const MenuButton = tw.label`btn btn-square btn-ghost`;
const Title = tw.div`flex-1 px-2 mx-2`;
const NavMenu = tw.ul`menu menu-horizontal`;
const SidebarMenu = tw.ul`menu p-4 w-80 min-h-full bg-base-200`;

export default function Header() {
  const { logout } = useLogoutUser();
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen()}
        onConfirm={() => logout()}
        title="로그아웃하시겠습니까"
        content="정말 로그아웃하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        confirmColor="red"
        cancelColor="blue"
      ></ConfirmModal>

      <section className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <header className="drawer-content flex flex-col">
          <Nav>
            <div className="flex-none lg:hidden">
              <MenuButton htmlFor="my-drawer-3" aria-label="open sidebar">
                <MenuIcon>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </MenuIcon>
              </MenuButton>
            </div>
            <Title>Safe Eye</Title>
            <aside className="flex-none hidden lg:block">
              <NavMenu>
                <Link href="/">home</Link>
                <Link href="/login">Login</Link>

                <LinkButton callback={() => setIsOpen()}>Logout</LinkButton>
              </NavMenu>
            </aside>
          </Nav>
        </header>
        <aside className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SidebarMenu>
            <Link href="/">home</Link>
            <Link href="/login">Login</Link>

            <LinkButton callback={() => setIsOpen()}>Logout</LinkButton>
            {/* <li>
            <Link href="/">Sidebar Item 2</Link>
          </li> */}
          </SidebarMenu>
        </aside>
      </section>
    </>
  );
}
