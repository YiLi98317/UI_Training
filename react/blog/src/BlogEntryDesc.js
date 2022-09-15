function BlogEntryDesc(props) {
    return(
        <div class="container">
            <h3><b>{props.title}</b></h3>
            <h5>{props.desc}, <span class="w3-opacity">{props.date}</span></h5>
        </div>
    );
}

export {BlogEntryDesc};