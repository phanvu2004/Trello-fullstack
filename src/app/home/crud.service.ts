import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../amplify/data/resource';
import { AuthService } from '../auth.service';

const client = generateClient<Schema>()
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private auth: AuthService) { }
  async createInstance(
    instance: 'Column' | 'Card',
    data: { title: string, order: number, columnId?: string, cardsList?: Array<any> }
  ) {
    const result = await client.models[instance].create(data);
    return result;
  }

   async createColumn(
    data: { title: string, order: number }
  ) {
    const result = await this.createInstance("Column", {
        ...data,
        cardsList: []
    })
    return result;
  }

  async createCard(
    data: { title: string, order: number, columnId: string }
  ) {
    const result = await this.createInstance("Card", data)
    return result;
  }

  async updateInstance(
    instance: 'Column' | 'Card',
    data: {id: string ,title?: string, order?: number, columnId?: string }
  ) {
    const result = await client.models[instance].update(data);
    return result;
  }

  async deleteInstance(
    instance: 'Column' | 'Card',
    id: string
  ) {
    await client.models[instance].delete({id});
  }

  async readAll() {
    const user = await this.auth.getUser()
    const { data } = await client.models.Column.listColumnsByOrder({
      owner: `${user.userId}::${user.username}`,
      order: {
        ge: 0
      }
    }, { sortDirection: "ASC" })

    data.forEach(async column => {
      const { data } = await client.models.Card.listCardsByOrder({
        columnId: column.id,
        order: {
          ge: 0
        }
      }, { sortDirection: "ASC"})

      column.cardsList = data;
    })

    return data;
  }
}
