/**
 * Auth Helpers
 **/
export function logout() {
  localStorage.removeItem("access");
  setTimeout(() => {
    window.location.reload();
  }, 100);
}

export function login() { }
