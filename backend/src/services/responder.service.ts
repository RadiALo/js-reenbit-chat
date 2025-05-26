import { ResponderRepository } from "../repositories/responder.model";

export class ResponderService {
  private responderRepository = new ResponderRepository();

  async getResponders() {
    return await this.responderRepository.findAll();
  }

  async getResponderById(responderId: string) {
    return await this.responderRepository.findById(responderId);
  }

  async createResponder(apiId: string, name: string) {
    return await this.responderRepository.create({ apiId, name });
  }
}