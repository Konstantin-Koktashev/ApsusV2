const { Link } = ReactRouterDOM

export function Home(){
    return(
        <main>
            <h1>
                Forget Everything You
                Knew About Efficency
            </h1>
            <h4>
                Instant Everything. Great Prices. Big Heart
            </h4>
            <div className="call-to-action">
            <Link to="/app" className="about-call-to-action-btn">
                <button className="call-to-action-btn">Check Our Prices</button>
               </Link>
                <section className="call-to-action-video">
                    <img src="../assets/img/play.svg" alt=""/>
                    <h6>Watch The Video</h6>
                </section>
            </div>
            <div className="hero-img">
                <img src="../assets/img/skyline.jpg" alt=""/>
            </div>
        </main>
    )
}