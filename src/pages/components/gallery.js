
import React, {useState} from 'react';
import './gallery.css';
import {TfiClose} from 'react-icons/tfi';
const Gallery = () =>{
    let data = [
        {
            id: 1,
            imgSrc: 'https://ae01.alicdn.com/kf/HTB19iQJjDlYBeNjSszcq6zwhFXaG/Metallic-Mirror-False-Nails-Fashion-Pink-Acrylic-Nails-Full-Cover-Nail-Tips-Manicure-Tool-24Pcs-N18.jpg',
        },
        {
            id: 2,
            imgSrc: 'https://th.bing.com/th/id/OIP.8v5EqBrJvcPMUMfBR2bsNQHaLH?pid=ImgDet&rs=1',
        },
        {
            id: 3,
            imgSrc: 'https://images.designtrends.com/wp-content/uploads/2016/04/05094509/Modern-Nail-Designs-for-Summer.jpg',
        },
        {
            id: 4,
            imgSrc: 'https://th.bing.com/th/id/OIP.1QuglO5uvSWez5e0abuACAHaKp?pid=ImgDet&rs=1',
        },
        {
            id: 5,
            imgSrc: 'https://th.bing.com/th/id/OIP.5JcCzmBGpcu4Eyx8raYENAHaHa?pid=ImgDet&rs=1',
        },
        {
            id: 6,
            imgSrc: 'https://african4.com/wp-content/uploads/2020/02/83029969_1292492374270069_7998305822928073070_n.jpg',
        },
        {
            id: 7,
            imgSrc: 'https://i1.wp.com/www.ecstasycoffee.com/wp-content/uploads/2016/10/Stunning-blue-and-white-abstract-stone-nails.jpg',
        },
        {
            id: 8,
            imgSrc: 'https://th.bing.com/th/id/OIP.pjibgBdTxxSX9gPoODjnhAHaLH?pid=ImgDet&rs=1',
        },
        {
            id: 9,
            imgSrc: 'https://th.bing.com/th/id/OIP.FTJpjvfg7WUclWsMXAIz1wHaKi?pid=ImgDet&rs=1',
        },
    ]
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTemImgSrc] = useState('');
    const getImg = (imgSrc) =>{
        setTemImgSrc(imgSrc);
        setModel(true);
    }

    return(
        <>
       <div style={{display:'flex', alignItems:'center', alignContent:'center'}}>
        <h2>Image Gallery</h2>
       </div>
       <div>
       <div class={model? "model open" : "model"}>
            <img src={tempimgSrc} />
            <TfiClose onClick={() => setModel(false)}/>
        </div>
        <div class="gallery">
            {data.map((item, index) =>{
                return(
                    <div class="pics" key={index} onClick={()=>getImg(item.imgSrc)}>
                    <img src={item.imgSrc} style={{width: '100%'}}/>
                </div>
                )
            })}
        </div>
       </div>
        </>
    );
}

export default Gallery;