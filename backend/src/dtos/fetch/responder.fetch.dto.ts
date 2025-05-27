export class ResponderFetchDto {
  apiId: string;
  name: string;

  constructor(data: any) {
    this.apiId = data.apiId;
    this.name = data.name;
  }
}