module Curriculum
  class StandardsController < ApplicationController

    def show
      if params[:include]
        @standard = Pbl::Models::Curriculum::Standard.find(params[:id], include: params[:include])
      else
        @standard = Pbl::Models::Curriculum::Standard.find(params[:id])
      end
    end

  end
end