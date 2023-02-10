import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { creatrGallery } from 'services/fetchImg';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Btn from 'components/Button/Button';
import Loader from '../Loader/Loader';
import {
  ImageGalleryList,
  Text,
} from 'components/ImageGallery/ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    data: [],
    isLoading: false,
    totalPages: 1,
  };

  async componentDidUpdate(pP, pS) {
    if (pP.imageName !== this.props.imageName) {
      this.setState({ data: [] });
    }

    if (pP.imageName !== this.props.imageName || pP.page !== this.props.page) {
      this.setState({ isLoading: true });

      try {
        const response = await creatrGallery({
          q: this.props.imageName,
          page: this.props.page,
        });

        this.setState(pS => ({
          data: [...pS.data, ...response.hits],
          totalPages: response.totalHits / 12,
        }));

        if (response.total === 0) throw new Error();
      } catch (error) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.',
          { theme: 'colored' }
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { data, totalPages, isLoading } = this.state;
    const { onBtnchangePage, page } = this.props;
    const isbtnHiden = totalPages < page;

    return (
      <>
        {isLoading && data.length <= 0 && <Loader />}
        {data.length > 0 ? (
          <>
            <ImageGalleryList>
              {data.map(item => (
                <ImageGalleryItem
                  key={item.id}
                  imgUrl={item.webformatURL}
                  descr={item.tags}
                  largeImage={item.largeImageURL}
                />
              ))}
            </ImageGalleryList>

            {isLoading && <Loader />}
            {!isbtnHiden ? <Btn incrementPage={onBtnchangePage}/>: <Text>...these are all pictures for this request...</Text>}
          </>
        ) : (
          <Text>Please enter your search picture ⤣</Text>
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  imageName: PropTypes.string,
  page: PropTypes.number,
  onBtnchangePage: PropTypes.func,
};
