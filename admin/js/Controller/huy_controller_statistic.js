import {statisticsView} from '../View/huy_view_statistic.js'
import {handleEventStatistics} from '../Model/huy_model_statistic.js'
export const statitics = {
    init(){
        document.getElementById("hau-content-page").innerHTML = statisticsView.renderStatistics();
        handleEventStatistics();
    }
}
