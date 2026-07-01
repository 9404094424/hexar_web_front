import react from 'react';

export default function Imageslider({ p1 }) {

    return (
        <section className="hero-slide">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
            >
                <source src="/videos/B4B.mp4" type="video/mp4" />
            </video>

            <div className="overlay"></div>

            <div className="hero-content">
                <div className="hero-left">
                    <h1>{p1.title}</h1>

                    <a href="/" className="take-look">
                        <span></span>
                        <p>{p1.subtitle}</p>
                    </a>
                </div>

                <div className="hero-right">

                    <img src={process.env.REACT_APP_API_PATH + "/uploads/" + p1.image} />

                </div>
            </div>

        </section>

    )
}
