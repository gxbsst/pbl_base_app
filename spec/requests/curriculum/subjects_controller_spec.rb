require 'rails_helper'

describe Curriculum::SubjectsController, type: :request do

  describe 'GET #index' do
    before(:each) do
      get 'curriculum/subjects', {}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'GET #show' do
    before(:each) do
      get 'curriculum/subjects/1'
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'GET #show with include' do
    before(:each) do
      get 'curriculum/subjects/1?include=phases'
    end
    it { expect(response.status).to eq(200)}
  end

end