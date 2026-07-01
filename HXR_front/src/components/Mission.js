import React, { useEffect, useState } from 'react'

export default function Mission() {

    const [record, setrecord] = useState([]);
    const [vision, setvision] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch(process.env.REACT_APP_API_PATH + "/api/mission").then(res => res.json()),
            fetch(process.env.REACT_APP_API_PATH + "/api/vision").then(res => res.json()),
        ])
            .then(([missionData, userData]) => {
                setrecord(missionData.data);
                setvision(userData.data);

            })
            .catch(err => console.error(err));
    }, []);
    return (
        <section className='bg2'>
            <div className=''>
                <div className='row align-items-center'>

                    <div className='col-lg-6'>
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1200 1200"
                        >
                            <defs>
                                <mask id="diamondMask">
                                    <rect width="1200" height="1200" fill="black" />

                                    <rect x="-460" y="80" width="1020" height="1020" rx="50" ry="50" fill="white" transform="rotate(45 -80 380)"></rect>

                                    <rect x="535.5" y="120" width="280" height="280" rx="25" ry="25" fill="white" transform="rotate(45 480 285)"></rect>

                                    <rect x="650.5" y="500.5" width="280" height="280" rx="25" ry="25" fill="white" transform="rotate(45 480 565)"></rect>

                                    <rect x="800.5" y="270.5" width="280" height="280" rx="25" ry="25" fill="white" transform="rotate(45 670 455)"></rect>

                                </mask>
                            </defs>

                            <foreignObject
                                width="1200"
                                height="1200"
                                mask="url(#diamondMask)"
                            >
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                >
                                    <source src="https://hexar-rgkn.onrender.com/videos/Hexar%20Video.mp4" />
                                </video>
                            </foreignObject>
                        </svg>
                    </div>
                    <div className='col-lg-6'>
                        <div className='mission'>
                            <div className='mb-5'>
                                {record &&
                                    record.map((res, index) => (
                                        <div key={index}>
                                            <h2 className='mb-3'>{res.missionTitle}</h2>
                                            <p>{res.missionDescription}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='mb-5'>
                                {vision &&
                                    vision.map((res, index) => (
                                        <div key={index}>
                                            <h2 className='mb-3'>{res.visionTitle}</h2>
                                            <p>{res.visionDescription}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
