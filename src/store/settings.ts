import { nanoid } from 'nanoid'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { SearchEngine, Settings } from '~/models'

const initialState: Settings = {
  searchEngines: [
    { id: '1', name: 'Bing', url: 'https://www.bing.com/search?q=%s' },
  ],
}

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  searchEngines = initialState.searchEngines

  @Mutation
  addSearchEngine(params: Partial<SearchEngine>): void {
    const id = nanoid()

    this.searchEngines = [
      ...this.searchEngines,
      {
        ...params,
        name: '',
        url: '',
        id,
      },
    ]
  }
  @Mutation
  removeSearchEngine({ id }: { id: string }): void {
    this.searchEngines = this.searchEngines.filter((item) => item.id !== id)
  }
  @Mutation
  removeSearchEngines({ ids }: { ids: string[] }): void {
    this.searchEngines = this.searchEngines.filter(
      (item) => !ids.includes(item.id)
    )
  }
  @Mutation
  setSearchEngine({ id, ...params }: Partial<SearchEngine>): void {
    this.searchEngines = this.searchEngines.map((item) => {
      if (item.id !== id) {
        return item
      }
      return {
        ...item,
        ...params,
      }
    })
  }
}
