export class ResponderFetchDto {
  apiId: string;
  name: string;
  quoteCount: number;

  constructor(data: any) {
    this.apiId = data._id;
    this.name = data.name;
    this.quoteCount = data.quoteCount;
  }
}