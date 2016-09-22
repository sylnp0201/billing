module Api
  class ReasonsController < ApiController

    def index
      @reasons = @current_user.reasons.order(id: :desc)
      render json: @reasons
    end

    def create
      begin
        @reason = @current_user.reasons.create!(reason_params)
        render json: @reason
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

    def update
      @reason = @current_user.reasons.find(params[:id])

      if (@reason.present?)
        @reason.update_attributes(reason_params)
        @reason.save!
        render json: @reason
      else
        render :json => { message: 'Billing Task Not Found' }, :status => :unprocessable_entity
      end
    end

    def destroy
      @current_user.reasons.destroy(params[:id])
    end

    private

      def reason_params
        params.require(:reason).permit(:id, :name)
      end

  end
end
