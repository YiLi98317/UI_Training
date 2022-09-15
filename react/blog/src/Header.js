function Header(props) {
    return(
        <header className='container center padding-32'>
            <h1><b>My BLOG</b></h1>
            <p>Welcome to the blog of 
                <span class="tag">{props.author}</span>
            </p>
        </header>
    );
}

export {Header};