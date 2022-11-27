import styles from '../../../styles/tracker.module.css'
const Tracker = () => {
    const trackers = [
        {
            title: 'Total Pages Viewed',
            tpv: "3344",
            rate: "59.73",
            gain: "35,000"
        },
        {
            title: 'Total Users',
            tpv: "3344",
            rate: "59.73",
            gain: "35,000"
        },
        {
            title: 'Total Orders',
            tpv: "3344",
            rate: "59.73",
            gain: "35,000"
        },
        {
            title: 'Total Sales',
            tpv: "3344",
            rate: "59.73",
            gain: "35,000"
        }
    ]
    return ( 
        <div>
            <div>
                <h2>Admin</h2>
            </div>

            <div className={styles.trackerGroup} >
                {trackers.map((tracker, i) => (
                    <div key={i} className={styles.tracker} >
                        <div className={styles.trackertitle}>
                            {tracker.title}
                        </div>
                        
                        <div className={styles.rates}>
                            <div>
                                {tracker.tpv}
                            </div>
                            <div>
                                {tracker.rate}
                            </div>
                        </div>

                        <div>
                            <p>You have made {tracker.gain} this month.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Tracker;