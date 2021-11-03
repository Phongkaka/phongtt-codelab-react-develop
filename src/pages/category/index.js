import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popconfirm, Icon, Divider, Pagination } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'
import { actions } from 'app/store/actions'

import './style.scss'

import EditCategoryModal from './edit-category-modal'

const PAGE_SIZE = 5

@connect(state => ({
  categoriesStore: state.categories
}), {
  getCategories: actions.getCategories,
  createCategory: actions.createCategory,
  updateCategory: actions.updateCategory,
  deleteCategory: actions.deleteCategory
})
class Category extends Component {
  componentDidMount() {
    this.props.getCategories(
      {
        page: 1,
        pageSize: PAGE_SIZE
      }
    )
  }

  _onPageChange = (page) => {
    this.props.getCategories({
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onDelete = (category) => {
    this.props.deleteCategory(category)
    this.props.getCategories(
      {
        page: 1,
        pageSize: PAGE_SIZE
      }
    )
  }

  render() {
    const { categoriesStore, createCategory, updateCategory, getCategories } = this.props
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'title',
      align: 'center'
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (row, record) => (
        <div>
          <Button
            onClick={() => this._editCategoryModal.open(record)}
          >
            <Icon type="edit" theme="twoTone" />
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Bạn có chắt xóa category này?"
            onConfirm={() => this._onDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              onClick={this._}
            >
              <Icon type="delete" theme="twoTone" twoToneColor="red" />
            </Button>
          </Popconfirm>
        </div>
      )
    }]

    return (
      <Page className="page page-category">
        <FitHeightContainer hasHeader>
          <Container>
            <button
              className="btn-animation add-btn"
              onClick={() => this._editCategoryModal.open()}
            >
              Add category
            </button>
            <Table
              pagination={false}
              rowKey={(row, index) => index}
              columns={columns}
              dataSource={categoriesStore.categories.content}
            />
            <Pagination
              defaultCurrent={1}
              pageSize={PAGE_SIZE}
              total={categoriesStore.categories.totalElements}
              onChange={this._onPageChange}
            />
            <EditCategoryModal
              getCategories={getCategories}
              categoriesStore={categoriesStore}
              createCategory={createCategory}
              updateCategory={updateCategory}
              ref={(ref) => { this._editCategoryModal = ref }}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Category
