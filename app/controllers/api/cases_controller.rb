module Api
  class CasesController < ApiController

    def index
      @cases = Case.all
      render json: @cases
    end

  end
end
