function BlogEntryImg(props) {
    return(
        <img 
            src={props.img.src}
            alt={props.img.alt}
        />
    );
}

export {BlogEntryImg};