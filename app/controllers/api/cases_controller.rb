module Api
  class CasesController < ApiController

    def index
      @cases = @current_user.cases
      render json: @cases
    end

    def create
      begin
        @case = @current_user.cases.create!(case_params)
        render json: @case
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

    def update
      @case = @current_user.cases.find(params[:id])

      if (@case.present?)
        @case.update_attributes(case_params)
      else
        render :json => { message: 'Case Not Found' }, :status => :unprocessable_entity
      end
    end

    def destroy
      @current_user.cases.destroy(params[:id])
    end

    private

      def case_params
        params.require(:case).permit(:id, :name, :deadline, :client, :summary, :description)
      end

  end
end
