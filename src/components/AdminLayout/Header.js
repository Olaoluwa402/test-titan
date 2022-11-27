import { AiOutlineMenuUnfold, AiFillLinkedin, AiFillBell, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import styles from '../../styles/adminheader.module.css'

const Header = () => {
    return ( 
        <div className={styles.adminheader}>
            <div className={styles.left}>
                <div>
                    <button className={styles.btn}>
                        <AiOutlineMenuUnfold />
                    </button>
                </div>
                
                {/* search box */}

                <div className={styles.search}>
                <div className={styles.searchIcon}>
                    <AiOutlineSearch />
                </div>
                    <input
                        type='text'
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className={styles.right}>
                <div>
                    <button className={styles.btn}>
                        <AiFillLinkedin />
                    </button>

                    <button className={styles.btn}>
                        <AiFillBell />
                    </button>
                </div>

                <div>
                    <div className={styles.admin}>
                        <span><AiOutlineUser /></span>
                        <span>John Doe</span>
                    </div>
                
                </div>
                    
            </div>
        </div>
     );
}
 
export default Header;