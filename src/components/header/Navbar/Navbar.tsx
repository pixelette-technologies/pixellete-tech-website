import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { navMenus } from '@/data/menu/navMenu';
import Image from 'next/image';
import Link from 'next/link';
import { MobileNavButton } from './Mobile/MobileNavButton';
import styles from './navbar.module.css';
import { NavbarDropDown } from './NavbarDropDown';

export const Navbar = () => {
  // const [activeMenu, setActiveMenu] = useState(false);

  // const handleNavMenu = () => {
  //   setActiveMenu(prev => !prev);
  // };

  // useEffect(() => {
  //   document.body.style.overflowY = activeMenu ? 'hidden' : 'auto';
  // }, [activeMenu]);

  return (
    <nav className={styles.navbar}>
      <Container className="main margins">
        <section className={styles.navContent}>
          {/* Logo Section */}
          <Link href="/">
            <Image
              src="/images/company/logo.svg" // Replace with the correct path to your logo
              alt="logo"
              width={100}
              height={50}
              data-aos="flip-left"
              data-aos-duration="1000"
            />
          </Link>

          {/* Navigation Links */}
          <div className={styles.navLinks}>
            {navMenus.map((el, index) =>
              el.subMenus
                ? (
                    <NavbarDropDown
                      name={el.name}
                      subMenus={el.subMenus}
                      key={el.id}
                    />
                  )
                : (
                    <Link
                      key={el.id}
                      href={el.to}
                      className={styles.navLink}
                      data-aos-duration={`${index}00`}
                      data-aos="fade-down"
                    >
                      {el.name}
                    </Link>
                  ),
            )}
          </div>

          {/* Contact Us Button */}
          <section className={styles.contactButton}>
            <Link href="/contact-us" passHref>
              <Button className="primary">
                Contact Us
              </Button>
            </Link>
          </section>

          {/* Mobile Menu Button */}
          {/* <button onClick={handleNavMenu} className={styles.menuButton}>
            {activeMenu ? '' : <IoMenuOutline size={30} />}
          </button> */}
          <MobileNavButton />
        </section>
      </Container>

      {/* Mobile Navigation */}
      {/* {activeMenu && <MobileNav onClick={handleNavMenu} />} */}
    </nav>
  );
};
