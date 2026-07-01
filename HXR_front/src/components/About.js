// import process from 'node:process';
import React, { useEffect, useState } from 'react'

export default function About() {

    let [record, setrecord] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_PATH + "/api/about")
            .then(res => res.json())
            .then(value => {
                console.log(value);
                setrecord(value.data)
            })
    }, [])
    return (
        <section className="bg1 position-relative text-white min-vh-100 p-0 overflow-hidden d-flex align-items-center">
            {record?.map((res, index) => (
                <div key={res.id || index} className="w-100">
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ zIndex: 1 }}
                    >
                        <img
                            src={process.env.REACT_APP_API_PATH+"/uploads/"+res.image}
                            className="w-100 h-100"
                            alt="Hexar Family background"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center right",
                            }}
                        />

                        <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                background:
                                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.1) 100%)",
                            }}
                        />
                    </div>

                    <div
                        className="container position-relative py-5"
                        style={{ zIndex: 10 }}
                    >
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="about">
                                    <h2 className='about-title'>{res.title}</h2>
                                </div>
                            </div>

                            <div className="col-lg-5 col-md-7 col-12">
                                <div className="about">
                                   <p>
                                    {res.description}
                                   </p>

                                    <div className="text-center mt-4">
                                        <img
                                            src="images/hexar-logo1.png"
                                            alt="Hexar Logo"
                                            className="img-fluid"
                                            style={{ maxHeight: "60px" }}
                                        />
                                    </div>

                                    <div className="text-center aboutlogo mt-2">
                                        <p
                                            className="text-muted text-uppercase mb-1"
                                            style={{
                                                fontSize: "0.7rem",
                                                letterSpacing: "1px",
                                            }}
                                        >
                                            The Parent Organisation
                                        </p>

                                        <img
                                            src="images/line.png"
                                            alt="Connecting Line"
                                            className="img-fluid mb-3"
                                            style={{ opacity: 0.5 }}
                                        />

                                        <div className="d-flex align-items-center justify-content-between gap-3">
                                            <div className="logo-1 p-2 text-center">
                                                <img
                                                    src="images/head-hoppers-logo.png"
                                                    className="img-fluid mb-2"
                                                    alt="Head Hoppers Logo"
                                                    style={{ maxHeight: "40px" }}
                                                />
                                                <p className="small m-0 text-secondary">
                                                    Character / Hair Specialist
                                                </p>
                                            </div>

                                            <div className="logo-2 p-2 text-center">
                                                <img
                                                    src="images/ares-logo.png"
                                                    className="img-fluid mb-2"
                                                    alt="Ares Logo"
                                                    style={{ maxHeight: "40px" }}
                                                />
                                                <p className="small m-0 text-secondary">
                                                    Concept / VFX / Technical Art / Co-dev
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 d-none d-lg-block" />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
