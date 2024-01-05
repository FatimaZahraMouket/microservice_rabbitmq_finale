import axios from 'axios';
const Voiture_API_BASE_URL="http://localhost:2026/Vill_Zone/zone/allzone";

class VoitureService {

    getVoiture(){
        return axios.get(Voiture_API_BASE_URL);
    }
    addVoiture(ville_id,voiture){
        return  axios.post(`http://localhost:2026/Vill_Zone/ville/${ville_id}/addZone`,voiture);
    }
    getVoitureById(voiture_id){
        return axios.get("http://localhost:2026/Vill_Zone/zone/"+voiture_id);
    }
    updateVoiture(ville_id,voiture_id,voiture){
        return  axios.put(`http://localhost:2026/Vill_Zone/ville/${ville_id}/updateZone/`+voiture_id,voiture);
    }
    deleteVoiture(voiture_id){
        return  axios.delete("http://localhost:2026/Vill_Zone/zone/deleteZone/"+voiture_id);
    }

}
export default new VoitureService();