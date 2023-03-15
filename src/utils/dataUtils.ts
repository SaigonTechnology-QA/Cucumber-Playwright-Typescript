import campaignData from '../resources/data/campaign.json';
import userData from '../resources/data/user.json';
import candidateData from '../resources/data/candidate.json';

export class DataUtils {
  getCampaignDataByType(type: string) {
    const extractData = campaignData.filter((key) => key.type === type);
    return extractData[0];
  }

  getCandidateDataByType(type: string) {
    const extractData = candidateData.filter((key) => key.type === type);
    return extractData[0];
  }

  getUserDataByRole(role: string) {
    const extractData = userData.filter((key) => key.role === role);

    return extractData[0];
  }
  async getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${year}${month}${day}-${hour}${min}${sec}`;
  }
  async getEmail() {
    return 'Auto' + (await this.getDateString()) + '@gmail.com';
  }
  async getPhoneNumber() {
    const timestamp = Date.now().toString();
    return '0' + timestamp.slice(-9);
  }
}
