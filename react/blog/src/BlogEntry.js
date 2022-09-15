import {BlogEntryImg} from './BlogEntryImg';
import {BlogEntryDetail} from './BlogEntryDetail';
import {BlogEntryDesc} from './BlogEntryDesc';

function BlogEntry(props) {
    return(
        <div class="w3-card-4 w3-margin w3-white">
            <BlogEntryImg img={props.img} />
            <BlogEntryDesc title={props.title} desc={props.desc} date={props.date} />
            <BlogEntryDetail content={""} />
        </div>
    );
}

export {BlogEntry};