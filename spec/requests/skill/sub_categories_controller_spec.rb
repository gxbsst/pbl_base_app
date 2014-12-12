require 'rails_helper'
describe Skill::SubCategoriesController do
  describe 'GET #index' do
    before(:each) do
      get 'skill/sub_categories', {}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'POST #create' do
    before(:each) do
      post 'skill/sub_categories', {name: 'name'}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'PATCH #update ' do
    before(:each) do
      patch 'skill/sub_categories/1', {name: 'name'}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'GET #show' do
    before(:each) do
      get 'skill/sub_categories/1'
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'DELETE #destroy' do
    before(:each) do
      delete 'skill/sub_categories/1'
    end
    it { expect(response.status).to eq(200)}
  end
end