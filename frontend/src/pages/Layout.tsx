import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'

function Layout() {
    return (
        
    <div className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
    )
}

export default Layout;