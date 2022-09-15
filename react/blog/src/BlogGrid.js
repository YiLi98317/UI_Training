import {BlogEntry} from './BlogEntry.js';

function BlogGird(props) {
    return(
        // {/* <!-- Blog entries --> */}
        <div class="block blog w3-col l8 s12" id="blog">
            {/* <!-- Blog entry --> */}
            <BlogEntry 
              img={{src: "https://www.w3schools.com/w3images/woods.jpg", alt: "Nature"}}
              title={"TITLE HEADING"}
              desc={"Title description"} 
              date={"April 7, 2014"}
            />
            {/* <!-- Blog entry 2--> */}
            <BlogEntry 
              img={{src: "https://www.w3schools.com/w3images/bridge.jpg", alt: "Norway"}}
              title={"BLOG ENTRY"}
              desc={"Title description"} 
              date={"April 2, 2014"}
            />
        </div>
        // {/* <!-- END BLOG ENTRIES --> */}
    );
}

export {BlogGird};