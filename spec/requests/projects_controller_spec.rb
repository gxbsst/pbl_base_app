require 'rails_helper'

describe ProjectsController, type: :request do

  describe 'POST #create' do
    before(:each)  do
      post 'projects', project: attributes_for(:project), format: :json
      @json = parse_json(response.body)
    end
    it{ expect(@json['id']).to be_nil}
  end

  describe 'GET #show' do
    before(:each)  do
      post 'projects', project: attributes_for(:project), format: :json
      @json = parse_json(response.body)
    end
    it 'get one project' do
     get "projects/#{@json['id']}"
     json = parse_json(response.body)
     expect(json['body']).to eq('.')
    end
  end

end