import {PostsItem} from './PostsItem';

function Posts(props) {
    return(
        <div class="card w3-margin posts-card">
            <div class="container w3-padding">
                <h4>Popular Posts</h4>
            </div>
            <ul class="w3-ul hoverable w3-white">
                <PostsItem 
                    href={"https://yili98317.github.io/UI_Training/table/table.html"}
                    src={"https://www.w3schools.com/w3images/workshop.jpg"}
                    alt={"Image"}
                    title={"HTML Table"}
                    desc={"To Simple Table"}
                />
                <PostsItem 
                    href={"https://yili98317.github.io/UI_Training/table/table.html"}
                    src={"https://www.w3schools.com/w3images/workshop.jpg"}
                    alt={"Image"}
                    title={"HTML Table"}
                    desc={"To Simple Table"}
                />
                <PostsItem 
                    href={"https://yili98317.github.io/UI_Training/table/table.html"}
                    src={"https://www.w3schools.com/w3images/gondol.jpg"}
                    alt={"Image"}
                    title={"HTML Table"}
                    desc={"To Simple Table"}
                />
                <PostsItem 
                    href={"https://yili98317.github.io/UI_Training/table/table.html"}
                    src={"https://www.w3schools.com/w3images/skies.jpg"}
                    alt={"Image"}
                    title={"Dorum"}
                    desc={"Ultricies congue"}
                />
                <PostsItem 
                    href={"https://yili98317.github.io/UI_Training/table/table.html"}
                    src={"https://www.w3schools.com/w3images/rock.jpg"}
                    alt={"Image"}
                    title={"Mingsum"}
                    desc={"Lorem ipsum dipsum"}
                />
            </ul>
        </div>
    );
}

export {Posts};