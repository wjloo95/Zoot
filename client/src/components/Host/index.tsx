import React, { useState } from 'react';
import {
  Form,
  Layout,
  Typography,
  Input,
  InputNumber,
  Radio,
  Upload,
  Button,
} from 'antd';
import { Viewer } from '../../lib/types';
import { ListingType } from '../../lib/graphql/globalTypes';
import {
  HomeOutlined,
  BankOutlined,
  TeamOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  getBase64Value,
  validateImage,
  displayErrorMessage,
  displaySuccessNotification,
} from '../../lib/utils';
import { UploadChangeParam } from 'antd/lib/upload';
import { SignedOutHost } from './children';
import { useMutation } from '@apollo/react-hooks';
import { HOST_LISTING } from '../../lib/graphql/mutations';
import {
  HostListing as HostListingData,
  HostListingVariables,
} from '../../lib/graphql/mutations/HostListing/__generated__/HostListing';
import { Store } from 'antd/lib/form/interface';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

interface IProps {
  viewer: Viewer;
}

export const Host = ({ viewer }: IProps) => {
  const history = useHistory();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageBase64Value, setImageBase64Value] = useState<string>('');

  const [hostListing, { loading, data }] = useMutation<
    HostListingData,
    HostListingVariables
  >(HOST_LISTING, {
    onCompleted: (data) => {
      displaySuccessNotification("You've successfully created your listing!");
      history.push(`/listing/${data.hostListing.id}`);
    },
    onError: () =>
      displayErrorMessage(
        "Sorry! We weren't able to create your listing. Please try again later."
      ),
  });

  const handleImageUpload = (info: UploadChangeParam) => {
    const { file } = info;

    if (file.status === 'uploading') {
      setImageLoading(true);
      return;
    }

    if (file.status === 'done' && file.originFileObj) {
      getBase64Value(file.originFileObj, (imageBase64Value) => {
        setImageBase64Value(imageBase64Value);
        setImageLoading(false);
      });
    }
  };

  const handleHostListing = (values: Store) => {
    const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.postalCode}`;

    const input = {
      type: values.type,
      numOfGuests: values.numOfGuests,
      title: values.title,
      description: values.description,
      address: fullAddress,
      image: imageBase64Value,
      price: values.price,
    };

    hostListing({
      variables: {
        input,
      },
    });
  };

  if (!viewer.id || !viewer.hasWallet) {
    return <SignedOutHost />;
  }

  return loading ? (
    <Content className="host-content">
      <div className="host__form-header">
        <Title level={3} className="host__form-title">
          Please wait!
        </Title>
        <Text type="secondary">We're creating your listing now.</Text>
      </div>
    </Content>
  ) : (
    <Content className="host-content">
      <Form
        layout="vertical"
        onFinish={handleHostListing}
        onFinishFailed={() =>
          displayErrorMessage('Please complete all required fields!')
        }
      >
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Hi! Let's get started listing your place.
          </Title>
          <Text type="secondary">
            In this form, we'll collect some basic and additional information
            about your listing.
          </Text>
        </div>

        <Item
          label="Home Type"
          name="type"
          rules={[{ required: true, message: 'Please select a home type!' }]}
        >
          <Radio.Group>
            <Radio.Button value={ListingType.APARTMENT}>
              <BankOutlined />
              <span>Apartment</span>
            </Radio.Button>
            <Radio.Button value={ListingType.HOUSE}>
              <HomeOutlined />
              <span>House</span>
            </Radio.Button>
            <Radio.Button value={ListingType.HOTEL}>
              <TeamOutlined />
              <span>Hotel</span>
            </Radio.Button>
          </Radio.Group>
        </Item>

        <Item
          label="Max # of Guests"
          name="numOfGuests"
          rules={[
            {
              required: true,
              message: 'Please enter the max number of guests!',
            },
          ]}
        >
          <InputNumber min={1} placeholder="4" />
        </Item>

        <Item
          label="Title"
          extra="Max character count of 45"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter a title for your listing!',
            },
          ]}
        >
          <Input
            maxLength={45}
            placeholder="The iconic and luxurious Bel-Air mansion"
          />
        </Item>

        <Item
          label="Description of listing"
          extra="Max character count of 400"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter a description for your listing!',
            },
          ]}
        >
          <Input.TextArea
            rows={3}
            autoSize
            maxLength={400}
            placeholder={`
              Modern, clean, and iconic home of the Fresh Prince.
              Situated in the heart of Bel-Air, Los Angeles.
            `}
          />
        </Item>

        <Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please enter an address for your listing!',
            },
          ]}
        >
          <Input placeholder="251 North Bristol Avenue" />
        </Item>

        <Item
          label="City/Town"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please enter a city (or region) for your listing!',
            },
          ]}
        >
          <Input placeholder="Los Angeles" />
        </Item>

        <Item
          label="State/Province"
          name="state"
          rules={[
            {
              required: true,
              message: 'Please enter a state for your listing!',
            },
          ]}
        >
          <Input placeholder="California" />
        </Item>

        <Item
          label="Zip/Postal Code"
          name="postalCode"
          rules={[
            {
              required: true,
              message: 'Please enter a zip code for your listing!',
            },
          ]}
        >
          <Input placeholder="Please enter a zip code for your listing!" />
        </Item>

        <Item
          label="Image"
          extra="Images have to be under 1MB in size and of type JPG or PNG"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please enter provide an image for your listing!',
            },
          ]}
        >
          <div className="host__form-image-upload">
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={validateImage}
              onChange={handleImageUpload}
            >
              {imageBase64Value ? (
                <img src={imageBase64Value} alt="Listing" />
              ) : (
                <div>
                  {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
          </div>
        </Item>

        <Item
          label="Price"
          extra="All prices in $USD/day"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please enter a price for your listing!',
            },
          ]}
        >
          <InputNumber min={0} placeholder="120" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Content>
  );
};
