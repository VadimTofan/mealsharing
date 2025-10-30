"use client";

import styles from "../page.module.scss";

import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./AuthContext";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, setUser, setToken } = useContext(AuthContext);

  const profileMenuRef = useRef(null);
  const pathname = usePathname();

  function handleNavClick() {
    setMenuOpen(false);
    setShowProfileMenu(false);
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    setShowProfileMenu(false);
    window.location.reload();
  }

  function handleLoginSuccess(credentialResponse) {
    const token = credentialResponse.credential;
    setToken(token);
    setShowLoginModal(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button className={`${styles.header__burger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
        <span className={styles.header__line}></span>
      </button>

      <nav className={`${styles.header__navigation} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.header__list}>
          {pathname !== "/" && (
            <li className={styles.header__link}>
              <Link href="/" onClick={handleNavClick}>
                Home
              </Link>
            </li>
          )}
          <li className={`${styles.header__link} ${pathname === "/meals" ? styles.header__current : ""}`}>
            <Link href="/meals" onClick={handleNavClick}>
              Meals
            </Link>
          </li>
          {!user ? (
            <li className={styles.header__link}>
              <button className={styles.header__button} onClick={() => setShowLoginModal(true)} style={{ cursor: "pointer", background: "none", border: "none" }}>
                Log In
              </button>
            </li>
          ) : (
            <>
              <li className={`${styles.header__link} ${pathname === "/orders" ? styles.header__current : ""}`}>
                <Link href="/orders" onClick={handleNavClick}>
                  Orders
                </Link>
              </li>

              {user?.picture && (
                <li className={styles.header__profile} ref={profileMenuRef}>
                  <img src={user.picture} alt="Profile" className={styles.header__image} onClick={() => setShowProfileMenu((prev) => !prev)} />

                  {showProfileMenu && (
                    <div className={styles.header__dropdown}>
                      <button onClick={handleLogout} className={styles.header__signout}>
                        Sign out
                      </button>
                    </div>
                  )}
                </li>
              )}
            </>
          )}
        </ul>
      </nav>

      {showLoginModal && (
        <div className={styles.header__modal}>
          <div className={styles.header__modalContent}>
            <h2 style={{ marginBottom: "1rem" }}>Sign in with Google</h2>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
            <button onClick={() => setShowLoginModal(false)} className={styles.header__cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
