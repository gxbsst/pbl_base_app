require 'rails_helper'
describe Skill::TechniquesController do
  describe 'GET #index' do
    before(:each) do
      get 'skill/techniques', {}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'POST #create' do
    before(:each) do
      post 'skill/techniques', {name: 'name'}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'PATCH #update ' do
    before(:each) do
      patch 'skill/techniques/1', {name: 'name'}
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'GET #show' do
    before(:each) do
      get 'skill/techniques/1'
    end
    it { expect(response.status).to eq(200)}
  end

  describe 'DELETE #destroy' do
    before(:each) do
      delete 'skill/techniques/1'
    end
    it { expect(response.status).to eq(200)}
  end
end