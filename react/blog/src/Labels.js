import {LabelsItem} from './LabelsItem';

function Labels(props) {
    return(
        <div class="card w3-margin">
        <div class="container w3-padding">
          <h4>Tags</h4>
        </div>
        <div class="container w3-white">
          <p>
            <LabelsItem tag={"Sports"} />
            <LabelsItem tag={"Travel"} />
            <LabelsItem tag={"New York"} />
            <LabelsItem tag={"London"} />
            <LabelsItem tag={"IKEA"} />
            <LabelsItem tag={"NORWAY"} />
            <LabelsItem tag={"DIY"} />
            <LabelsItem tag={"Ideas"} />
            <LabelsItem tag={"Baby"} />
            <LabelsItem tag={"Family"} />
            <LabelsItem tag={"News"} />
            <LabelsItem tag={"Clothing"} />
            <LabelsItem tag={"Shopping"} />
            <LabelsItem tag={"Games"} />
          </p>
        </div>
      </div>
    );
}

export {Labels};