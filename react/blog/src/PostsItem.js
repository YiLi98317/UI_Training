function PostsItem(props) {
    return(
        <li class="w3-padding-16">
            <a href={props.href}>
            <img class="left margin-right" src={props.src} alt={props.alt} ></img>
            <span class="large">{props.title}</span>
            <span>{props.desc}</span>
            </a>
        </li>
    );
}

export {PostsItem};