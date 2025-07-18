import { Component, ReactElement } from 'react';
import { List, Results } from '../types';
import { Header } from './header';
import { CardList, FullList, Loader, NotFound } from './components';
import { Footer } from './footer';
import { apiRequest } from './api';

type State = {
  list: Results[];
  card: undefined;
  error: boolean;
};

export class Page extends Component {
  state: State = {
    list: [],
    card: undefined,
    error: false,
  };

  componentDidMount(): void {
    const idItem = localStorage.getItem('key');
    apiRequest(idItem)
      .then((response) => response.json())
      .then((response: List) =>
        idItem
          ? this.setState({ card: response })
          : this.setState({ list: response.results }),
      );
  }

  searchRequest = (searchString: string): void => {
    apiRequest(searchString)
      .then((response) => {
        if (
          Math.trunc(response.status / 100) === 4 ||
          Math.trunc(response.status / 100) === 5
        ) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
          return response.json();
        }
      })
      .then((response: List) => {
        if (response && response.name) {
          localStorage.setItem('key', response.name);
        } else {
          localStorage.setItem('key', '');
        }
        if (searchString.length) {
          this.setState({ card: response });
        } else {
          this.setState({ card: undefined });
          this.setState({ list: response.results });
        }
      });
  };

  render(): ReactElement {
    const { list, card, error } = this.state;
    return (
      <>
        <Header searchRequest={this.searchRequest} />
        {error ? (
          <NotFound />
        ) : list.length || card ? (
          card ? (
            <CardList cards={card} />
          ) : (
            <FullList list={list} />
          )
        ) : (
          <Loader />
        )}
        <Footer />
      </>
    );
  }
}
